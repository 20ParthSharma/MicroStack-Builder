const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
const Project = require('../models/Project');

// Helper to copy boilerplate directory
const copyTemplate = async (templatePath, targetPath) => {
  const source = path.join(__dirname, '..', templatePath);
  if (await fs.pathExists(source)) {
    await fs.copy(source, targetPath);
  } else {
    console.warn(`Template source not found: ${source}`);
    // If folder doesn't exist, create an empty one
    await fs.ensureDir(targetPath);
  }
};

// @desc    Generate a boilerplate and download ZIP
// @route   POST /api/generate
// @access  Private
exports.generateProject = async (req, res) => {
  try {
    const { name, frontend, backend, database, architecture } = req.body;

    if (!name || !frontend || !backend || !database || !architecture) {
      return res.status(400).json({ success: false, error: 'Please provide all configuration fields' });
    }

    // 1. Generate unique directory ID
    const buildId = crypto.randomUUID();
    const buildPath = path.join(__dirname, '..', 'tmp', buildId);
    
    await fs.ensureDir(buildPath);

    // 2. Build directories based on config
    const rootDir = path.join(buildPath, name);
    await fs.ensureDir(rootDir);

    // README
    const readmeContent = `# ${name}\nGenerated with MicroStack Builder.\n\n## Stack\n- Frontend: ${frontend}\n- Backend: ${backend}\n- Database: ${database}\n- Architecture: ${architecture}`;
    await fs.writeFile(path.join(rootDir, 'README.md'), readmeContent);

    // Docker and Actions
    if (architecture === 'microservices' || architecture === 'mvc') {
      await copyTemplate('templates/docker/docker-compose.yml', path.join(rootDir, 'docker-compose.yml'));
      
      const githubActionsDir = path.join(rootDir, '.github', 'workflows');
      await fs.ensureDir(githubActionsDir);
      await copyTemplate('templates/actions/main.yml', path.join(githubActionsDir, 'main.yml'));
    }

    // Frontend
    if (frontend !== 'none') {
      const frontendDir = path.join(rootDir, 'client');
      await copyTemplate(`templates/frontend/${frontend}`, frontendDir);
    }

    // Backend
    if (backend !== 'none') {
      const backendDir = path.join(rootDir, 'server');
      await copyTemplate(`templates/backend/${backend}`, backendDir);
      
      if (backend === 'express') {
        // modify package.json for DB if needed
        if (database === 'mongodb') {
          const pkgPath = path.join(backendDir, 'package.json');
          if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.dependencies.mongoose = "^7.5.0";
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
          }
        } else if (database === 'postgres') {
          const pkgPath = path.join(backendDir, 'package.json');
          if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.dependencies.pg = "^8.11.3";
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
          }
        }
      }
    }

    // 3. Save to History
    await Project.create({
      userId: req.user.id,
      name,
      frontend,
      backend,
      database,
      architecture,
    });

    // 4. Zip and Stream
    res.attachment(`${name}.zip`);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.on('error', (err) => {
      throw err;
    });

    // on close, delete the temp files asynchronously
    res.on('close', async () => {
      try {
        await fs.remove(buildPath);
      } catch (e) {
        console.error('Error removing tmp folder', e);
      }
    });

    archive.pipe(res);
    archive.directory(rootDir, name);
    await archive.finalize();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error during generation' });
  }
};

const fs = require('fs');
const path = require('path');

function readDeploymentFile() {
  _createDeploymentFileIfNeeded();

  return JSON.parse(fs.readFileSync(_getDeploymentFilePath()));
}

function saveDeploymentFile(data) {
  fs.writeFileSync(_getDeploymentFilePath(), JSON.stringify(data, null, 2));
}

function _getDeploymentFilePath() {
  return path.join(_getDeploymentsDirectoryPath(), `${network.name}.json`);
}

function _getDeploymentsDirectoryPath() {
  return hre.config.deployer.paths.deployments;
}

function _createDeploymentFileIfNeeded() {
  const directoryPath = hre.config.deployer.paths.deployments;

  if (!fs.existsSync(_getDeploymentsDirectoryPath())) {
    fs.mkdirSync(directoryPath);
  }

  const filePath = _getDeploymentFilePath();
  if (!fs.existsSync(filePath)) {
    const deployment = {};

    fs.appendFileSync(filePath, JSON.stringify(deployment, null, 2));
  }
}

module.exports = {
  readDeploymentFile,
  saveDeploymentFile,
};

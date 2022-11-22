import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  await deployments.deploy("ToldSo", {
    from: deployer,
    log: true,
  });
};

export default func;

func.tags = ["ToldSo"];

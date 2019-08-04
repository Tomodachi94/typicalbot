const Command = require("../../structures/Command");
const Constants = require(`../../utility/Constants`);
const { exec } = require("child_process");
const { join } = require("path");
const pm2 = require("pm2");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "A command to restart the bot or a cluster.",
            usage: "restart <cluster-name>",
            permission: Constants.Permissions.Levels.TYPICALBOT_MAINTAINER,
            mode: Constants.Modes.STRICT
        });
    }

    execute(message, parameters, permissionLevel) {
        pm2.connect(function(err) {
            if (err) console.error(err);
            
            pm2.restart(parameters, function(err, apps) {
                if (err) {
                    message.error("An error occured while trying to restart, check the console.");
                    console.error(err);
                } else message.reply("Successfully restarted.");

                pm2.disconnect();
            });
        });
    }
};

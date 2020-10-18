addLayer("t", {
        name: "Temperature", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#e33702",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Kelvins", // Name of prestige currency
        baseResource: "joules", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        base: 3,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "T", description: "Reset your joules to turn up the heat.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},

        effect() {return player[this.layer].points},
        effectDescription() {return `generating ${tmp[this.layer].effect} base joules per second.`},

        milestones: {
            0: {requirementDescription: "1 Kelvin",
                //unlocked() {return hasMilestone(this.layer, 0)},
                done() {return player[this.layer].points.gte(1)},
                effectDescription: "Begin the generation of Joules, and unlock upgrades.",
                style() {                     
                    if(hasMilestone(this.layer, this.id)) return {
                        'background-color': '#e33702' 
                }},
            },

        },

        upgrades: {
            rows: 2,
            cols: 3,
            11: {
                title: "It's an upgrade!",
                description: "Multiply joule gain by 2.",
                cost: new Decimal(10),
                currencyDisplayName: "joules", // Use if using a nonstandard currency
                currencyInternalName: "points", // Use if using a nonstandard currency

                unlocked() { return hasMilestone(this.layer, 0) }, // The upgrade is only visible when this is true
            },
        },


        tabFormat: {
            "Upgrades": {
                //buttonStyle() {return  {'color': 'orange'}},
                content:
                    ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"], // Height
                    "upgrades"],
            },
            "Thermal Milestones": {
                //buttonStyle() {return  {'color': 'orange'}},
                content:
                    ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"], // Height
                    "milestones"],
            },
        },
})
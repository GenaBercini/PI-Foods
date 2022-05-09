const { Diets } = require('../db.js');

const typesController = {
    getTypes: async (req, res, next) => {
        try {
            let diets = [
                "gluten free",
                "lacto ovo vegetarian",
                "vegan",
                "pescatarian",
                "paleolithic",
                "primal",
                "fodmap friendly",
                "dairy free",
                "whole 30",
                "ketogenic",
            ];
    
            diets.forEach((name) => {
                Diets.findOrCreate({
                    where: {name: name},
                    defaults: {
                        name: name,
                    }
                });
            });
    
            let allDiets = await Diets.findAll();
            res.json(allDiets);
    
        }
        catch(e) {
            res.status(404).json({ message: 'An error has occurred', error: e });
        }
    }
}

module.exports = typesController;
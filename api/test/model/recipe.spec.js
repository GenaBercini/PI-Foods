const { Recipe, conn } = require('../../src/db.js');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ 
            title: 'Milanesa a la napolitana',
            healthScore: 45,
            spoonacularScore: 50,
            summary: 'Excelente receta',
            steps: 'Freir, servir y comer' });
      });
    });
  });
});
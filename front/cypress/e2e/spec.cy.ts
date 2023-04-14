describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Mentions Légales');
    cy.contains('Gérer efficacement votre stock');
    cy.contains('a', 'Voir le stock').click();
    cy.get('a[title="Ajouter"]').click();

    const uuid = () => Cypress._.random(0, 1e6);
    const name = `o${uuid()}`;
    cy.get('input').eq(0).clear().type(name);
    cy.get('input').eq(1).clear().type('23.45');
    cy.get('input').eq(2).clear().type('123eee...ttt');
    cy.contains('button', 'Ajouter').click();
    cy.contains('tbody tr td', name).click();
    cy.get('button[title="Supprimer"]').click();
  });
});

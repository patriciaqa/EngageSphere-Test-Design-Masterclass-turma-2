describe("EngageSphere", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the heading and theme toggle", () => {
    cy.get("#theme-toggle-button").should("be.visible");
    cy.get("#root > main > div.header-container > h1")
      .should("to.be.visible")
      .and("contain", "EngageSphere")
  });

  it("shows the default greeting (i.e., Hi there! ...)", () => {
    cy.get("#root")
      .find("[data-testid='table']")
      .should("to.be.eql", "Hi")
      // .should()
  })


});

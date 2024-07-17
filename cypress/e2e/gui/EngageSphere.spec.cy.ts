describe("EngageSphere", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("shows the heading and theme toggle", () => {
    cy.get("#theme-toggle-button").should("be.visible")
  })
})
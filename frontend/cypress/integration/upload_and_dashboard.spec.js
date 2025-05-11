describe('Upload and Dashboard Flow', () => {
  it('uploads CSV and shows stats and chart', () => {
    cy.visit('http://localhost:3000');
    // Upload sample CSV
    const filepath = 'sample_data.csv'; // place under cypress/fixtures
    cy.get('input[type="file"]').attachFile(filepath);
    cy.get('button').contains('อัปโหลดไฟล์').click();
    // รอให้ stats ปรากฏ
    cy.contains('Mean:').should('be.visible');
    cy.contains('กราฟ Sensor Data').should('be.visible');
  });
});

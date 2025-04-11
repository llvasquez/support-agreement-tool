describe('ReviewExportStep', () => {
  it('should disable export buttons when no agreement is present', () => {
    const { getByText } = render(<ReviewExportStep />);
    expect(getByText('Export to PDF')).toBeDisabled();
    expect(getByText('Export to DOCX')).toBeDisabled();
  });

  it('should show error message when export fails', async () => {
    // Test implementation
  });

  it('should successfully export PDF', async () => {
    // Test implementation
  });
});
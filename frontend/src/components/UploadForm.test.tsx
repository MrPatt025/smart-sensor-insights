import { render, screen, fireEvent } from '@testing-library/react';
import UploadForm from './UploadForm';

describe('UploadForm', () => {
  it('renders file input and submit button disabled initially', () => {
    render(<UploadForm onStats={() => {}} />);
    expect(screen.getByRole('button', { name: /อัปโหลดไฟล์/i })).toBeDisabled();
    expect(screen.getByRole('textbox', { hidden: true })).toBeInTheDocument();
  });

  it('enables button when file is selected', () => {
    render(<UploadForm onStats={() => {}} />);
    const input = screen.getByLabelText(/file/i) as HTMLInputElement;
    const file = new File(['name,value'], 'data.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByRole('button', { name: /อัปโหลดไฟล์/i })).toBeEnabled();
  });
});

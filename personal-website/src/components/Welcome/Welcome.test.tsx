import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct font links', () => {
    render(<Welcome />);
    expect(screen.getByText('Verdana for body text')).toHaveAttribute(
      'href',
      'https://fonts.google.com/specimen/Verdana'
    );
    expect(screen.getByText('Poppins for headings')).toHaveAttribute(
      'href',
      'https://fonts.google.com/specimen/Poppins'
    );
  });
});

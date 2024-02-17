import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingForm from './components/BookingForm';
import Header from './components/Header';



test("Renders the BookingForm", () => {
  render(<BookingForm />);
  const submitBtn = screen.getByText("Make Your Reservation");
  expect(submitBtn).toBeInTheDocument();
});

test("Updates the time correctly", () => {
  render(<BookingForm />);
  const dateSelector = screen.getByLabelText(/Choose Date/);
  fireEvent.change(dateSelector, { target: { value: "2023-02-05" } });
  const timeDropDown = screen.getByLabelText(/Choose Time/);
  fireEvent.change(timeDropDown, { target: { value: "17:00" } });
  expect(timeDropDown.value).toEqual("17:00");
});


describe('Header Component', () => {
  test('renders Reserve Table button and navigates to booking on click', () => {
      render(
          <Router>
              <Header />
          </Router>
      );

      const reserveTableButton = screen.getByRole('button', { name: /reserve table/i });
      expect(reserveTableButton).toBeInTheDocument();

      // Simulate a click and check the navigation
      fireEvent.click(reserveTableButton);
      expect(window.location.pathname).toEqual('/booking');
  });
});

test('Renders the Header heading', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const headingElement = screen.getByText("Reserve Table");
    expect(headingElement).toBeInTheDocument();

    const reserveButton = screen.getByRole("button", { name: /reserve table/i });
    fireEvent.click(reserveButton);

    const headingElementNew = screen.getByText("Choose Date:");
    expect(headingElementNew).toBeInTheDocument();
})

test('Initialize/Update Times', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const reserveButton = screen.getByRole("button");
  fireEvent.click(reserveButton);

  const testTime = []
})
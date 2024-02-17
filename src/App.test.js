import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingForm from './components/BookingForm';
import Header from './components/Header';



test("Renders the Header", () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const submitBtn = screen.getByText(/reserve table/i);
  expect(submitBtn).toBeInTheDocument();
});

test("Renders the BookingForm", () => {
  const mockProps = {
    submitForm: jest.fn(),
    dispatch: jest.fn(),
    availableTimes: { availableTimes: ['10:00', '11:00'] }
  };

  render(<BookingForm {...mockProps} />);

  const submitBtn = screen.getByTestId('reservation-submit');
  expect(submitBtn).toBeInTheDocument();
});


test("Initialize/Update Times", () => {
  const mockProps = {
    submitForm: jest.fn(),
    dispatch: jest.fn(),
    availableTimes: { availableTimes: ['10:00', '11:00'] }
  };

  render(<BookingForm {...mockProps} />);

  const dateSelector = screen.getByLabelText("Choose Date:");
  fireEvent.change(dateSelector, { target: { value: "2023-02-05" } });
  const timeDropDown = screen.getByLabelText("Choose Time:");
  fireEvent.change(timeDropDown, { target: { value: "10:00" } });
  expect(timeDropDown.value).toEqual("10:00");
});


describe('Header Component', () => {
  test('renders Reserve Table button and navigates to booking on click', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);

      const reserveTableButton = screen.getByText(/reserve table/i);
      expect(reserveTableButton).toBeInTheDocument();

      fireEvent.click(reserveTableButton);
      expect(window.location.pathname).toEqual('/booking');
    });
  });

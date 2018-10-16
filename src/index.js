import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition from 'react-speech-recognition'
import './index.css';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class SpeechInput extends React.Component {
  constructor(props) {
    super(props);
    this.selectBooking = props.selectBooking;
    this.state = {
      status: props.status,
      bookings: props.bookings,
      selectedBooking: props.selectedBooking
    };
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    const bookings = this.state.bookings;
    const bookingsList = bookings.map((booking) =>
      <option key={booking.number} value={booking.number}>{booking.number}</option>
    );
    const selectedBooking = this.state.selectBooking;
    const selectedBookingNumber = !selectedBooking ? undefined : selectedBooking.number;

    return (
      <div>
        <select value={!this.state.selectedBooking ? undefined : this.state.selectedBooking.number} onChange={this.selectBooking}>
          <option value="undefined">Select Booking</option>
          <option value="90056">90056 (invalid test)</option>
          {bookingsList}
        </select>
      </div>
    );
  }
}

function BookingDisplay(props) {
  const bookingData = props.bookingData;
  const bookingNumber = bookingData.number;
  const passengers = bookingData.passengers;
  const passengerList = passengers.map((passenger) =>
    <li key={passenger}>{passenger}</li>
  );
  const roomNumber = bookingData.roomNumber;

  return (
    <div className="booking-display">
      <div className="booking-number">Booking Number: {bookingNumber}</div>

      <div className="booking-passengers">
        <p>Passengers</p>
        <ol>{passengerList}</ol>
      </div>

      <div className="booking-roomNumber">Room Number: {roomNumber}</div>
    </div>
  );
}

function KioskHelp(props) {
  if (!!props.invalidBookingNumber) {
    return (
      <div>
        <div>Booking number {props.invalidBookingNumber} is invalid. Please speak again or go to the service desk.</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Please speak a booking number in order to retrieve your booking details.</div>
      </div>
    )
  }
}

function BookingOutput(props) {
  const bookingData = props.selectedBooking;
  const invalidBookingNumber = props.invalidBookingNumber;

  if (bookingData !== undefined) {
    return <BookingDisplay bookingData={bookingData} />
  } else {
    return <KioskHelp invalidBookingNumber={invalidBookingNumber} />
  }
}

class Kiosk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBooking: undefined,
      bookings: [ // Move data to SQLite or other database and retrieve via AJAX call in the future
        {
          number: 12345,
          passengers: [
            'John Smith',
            'Jane Doe'
          ],
          roomNumber: 404
        },
        {
          number: 54321,
          passengers: [
            'Hammer Johnson',
            'Janet Potts',
            'Henry Morrison'
          ],
          roomNumber: 400
        },
        {
          number: 76912,
          passengers: [
            'Spark Mason',
            'Helena Ferris'
          ],
          roomNumber: 201
        }
      ],
      status: 'No Booking Selected.',
      requestTimeout: undefined,
      invalidBookingNumber: null,
    };

    this.selectBooking = this.selectBooking.bind(this);
  }

  selectBooking(event) {
    const bookingNumber = event.target.value;
    const bookingData = this.state.bookings.find(function(booking) {
      return (booking.number == bookingNumber);
    });

    this.setState({selectedBooking: bookingData});
    if (!bookingData) {
      this.setState({invalidBookingNumber: bookingNumber});
    }

    clearTimeout(this.state.requestTimeout);
    this.state.requestTimeout = setTimeout(() => {
      this.setState({selectedBooking: undefined, invalidBookingNumber: null});
    }, 20000);
  }

  render() {
    return (
      <div className="kiosk">
        <div className="speech-input">
          <SpeechInput selectedBooking={this.state.selectedBooking} bookings={this.state.bookings} selectBooking={this.selectBooking} />
        </div>

        <div className="booking-info">
          <BookingOutput selectedBooking={this.state.selectedBooking} invalidBookingNumber={this.state.invalidBookingNumber} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Kiosk />,
  document.getElementById('root')
);

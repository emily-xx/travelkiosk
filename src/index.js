import React from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition from 'react-speech-recognition'
import './index.css';

class SpeechInput extends React.Component {
  constructor(props) {
    super(props);
    this.selectBooking = props.selectBooking;
    this.state = {
      status: props.status,
      bookings: props.bookings,
    };
  }

  render() {
    const bookings = this.state.bookings;
    const bookingsList = bookings.map((booking) =>
      <option value={booking.number}>{booking.number}</option>
    );

    return (
      <div>
        <select onChange={this.selectBooking}>
          <option value="">Select Booking</option>
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
    <li>{passenger}</li>
  );
  const roomNumber = bookingData.roomNumber;

  return (
    <div>
      <div className="booking-number">{bookingNumber}</div>
      <ol className="booking-passengers">{passengerList}</ol>
      <div className="booking-roomNumber">{roomNumber}</div>
    </div>
  );
}

function KioskHelp(props) {
  return (
    <div>
      <div>Please speak a booking number in order to retrieve your booking details.</div>
    </div>
  )
}

function BookingOutput(props) {
  const bookingData = props.selectedBooking;

  if (bookingData !== null) {
    return <BookingDisplay bookingData={bookingData} />
  } else {
    return <KioskHelp />
  }
}

class Kiosk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBooking: null,
      bookings: [
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
    };

    this.selectBooking = this.selectBooking.bind(this);
  }

  selectBooking(event) {
    const bookingNumber = event.target.value;
    const bookingData = this.state.bookings.find(function(booking) {
      return (booking.number == bookingNumber);
    });

    if (!!bookingData) {
      this.setState({selectedBooking: bookingData});

      setTimeout(() => {
        this.setState({selectedBooking: null})
      }, 20000);
    }
  }

  render() {
    return (
      <div className="kiosk">
        <div className="speech-input">
          <SpeechInput status={this.state.status} bookings={this.state.bookings} selectBooking={this.selectBooking} />
        </div>

        <div className="booking-info">
          <BookingOutput selectedBooking={this.state.selectedBooking} />
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

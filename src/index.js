import React from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition from 'react-speech-recognition'
import './index.css';

class SpeechInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    };
  }

  render() {
    return (
      <div>
        <div className="status">{this.state.status}</div>
      </div>
    );
  }
}

function BookingDisplay(props) {
  const bookingData = props.selectedBooking;
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
      <div></div>
    </div>
  )
}

function BookingOutput(props) {
  if (props.selectedBooking !== null) {
    return <BookingDisplay bookingData={props.selectedBooking} />
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
  }

  render() {
    return (
      <div className="kiosk">
        <div className="speech-input">
          <SpeechInput status={this.state.status} />
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

import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Component } from "react";

class DatePicker extends Component {
  render() {
    const { value, onChange } = this.props; // Pegando value e onChange das props
    return (
      <Flatpickr
        options={{
          altInput: true,
          altFormat: "F j, Y",
          enableTime: true,
          dateFormat: "d-m-Y",
          disableMobile: "true",
        }}
        data-enable-time
        value={value} // Usando o value vindo das props
        onChange={onChange} // Usando a função onChange vindo das props
        className="rounded-xl"
      />
    );
  }
}

export default DatePicker;

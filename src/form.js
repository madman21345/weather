import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({ city, handleCity, date, handleDate, handleSubmit }) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            City:
            <input type="text" value={city} onChange={handleCity} />
          </label>
          <br />
          <label>
            Date:
            <DatePicker selected={date} onChange={handleDate} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
export default Form
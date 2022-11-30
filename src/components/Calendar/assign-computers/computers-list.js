import React, {
  useEffect,
  useState,
} from 'react';
import {
  Modal,
  Button,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as yup from "yup";

import {
  endTime,
  mentors,
  startTime,
  students,
} from '../data';

import '../../../less/computers-list-style.less';

const ComputersList = (props) => {
  const newList = [];
  const numComputers = 10;
  for (let i = 1; i <= numComputers; i++) newList.push('computer');
  const [serverError, setServerError] = useState("");
  const [formState, setFormState] = useState({
    mentor: "",
    student: "",
    startTime: "",
    endTime: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    mentor: "",
    student: "",
    startTime: "",
    endTime: "",
  });
  const formSchema = yup.object().shape({
    mentor: yup.string().oneOf(["Leo", "Calli", "Morgan"]),
    student: yup.string().oneOf(["Nyx", "Steven", "Morgan"]),
    startTime: yup.string().oneOf(["10am", "11am", "12pm"]),
    endTime: yup.string().oneOf(["11am", "12pm", "1pm"]),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((isFormValid) => {
      console.log("is form valid?", isFormValid);
      setButtonDisabled(!isFormValid);
    });
  }, [formState]);

  const formSubmit = (e) => {
    e.preventDefault();
    setFormState({
      mentor: "",
      student: "",
      startTime: "",
      endTime: "",
    });
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "clicked" ? e.target.checked : e.target.value)
      .then(() => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: (
        e.target.name === "clicked"
          ? e.target.checked
          : e.target.value
      ),
    };
    setServerError(null);
    validateChange(e);
    setFormState(newFormData);
  };
    
  /*Funcionality for Return and Save Changes button*/
  const save = () => {
    Modal.info({
      content: (
        <div>
          <p>Would you like to save all changes?</p>
        </div>
      ),
      onOk() {},
    });
  };

  const backToCalendar = () => {
    Modal.confirm({
      title: 'Would you like to return to the calendar?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        window.location.reload();
      },
      onCancel() {},
    });
  };

    return (
      <form onSubmit={formSubmit}>
          {/* in case we somehow got here without props. */}
          {(props.dragSelected)
            ? <p className='date-time-string'>
                {props
                  .dragSelected
                  .start
                  .toLocaleString()
                } to {props
                  .dragSelected
                  .end
                  .toLocaleString()
                }
              </p>
            : null
          }
          <div className='container'>
            <div className='computer-list-container'>
              {newList.map((computer, i) => {
                return (
                  <div className='computer-list' key={i}>
                    <div
                      className={
                        (formState.mentor
                          && formState.student
                          && formState.startTime
                          && formState.endTime
                        )
                          ? `unavailable mentee-mentors-container`
                          : `unavailable`
                      }>
                        {computer + (i + 1)}
                      </div>
                    <div>
                      {serverError ? <p className="error">{serverError}</p> : null}
                      <select
                        className='mentor-list'
                        id="mentor"
                        name="mentor"
                        onChange={inputChange}
                      >
                        <option value="none" selected disabled>Mentors List</option>
                        {mentors.map((mentor, i) => <option key={i}>{mentor}</option>)}
                      </select>
                      {(errors.mentor.length > 0)
                        ? (<p className="error">{errors.mentor}</p>)
                        : null
                      }
                      <select
                        className='students-list'
                        id="student"
                        name="student"
                        onChange={inputChange}
                      >
                        <option value="none" selected disabled>Students List</option>
                        {students.map((student, i) => <option key={i}>{student}</option>)}
                      </select>
                      {(errors.student.length > 0)
                        ? (<p className="error">{errors.student}</p>)
                        : null
                      }
                      <select
                        className='start-time-list'
                        id="startTime"
                        name="startTime"
                        onChange={inputChange}
                      >
                        <option value="none" selected disabled>Start Time</option>
                        {startTime.map((start, i) => <option key={i}>{start}</option>)}
                      </select>
                      {(errors.startTime.length > 0)
                        ? (<p className="error">{errors.startTime}</p>)
                        : null
                      }
                      <select
                        className='end-time-list'
                        id="endTime"
                        name="endTime"
                        onChange={inputChange}
                      >
                        <option value="none" selected disabled>End Time</option>
                        {endTime.map((end, i) => <option key={i}>{end}</option>)}
                      </select>
                      {(errors.endTime.length > 0)
                        ? (<p className="error">{errors.endTime}</p>)
                        : null
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/*  Code for React popup message*/ }
      <div className='buttons-container'>
        <button className='scheduler-button' disabled={buttonDisabled} type="submit" onClick={save}>
          Save Changes
        </button>
                        
        <Button className='scheduler-button' type="primary" onClick={backToCalendar}>
          Return
        </Button>
      </div>
    </form>
  );
}

export default ComputersList;

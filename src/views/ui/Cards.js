import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import "./Cards.css";
import {Button} from "reactstrap";


const Cards = ({onCreate}) => {
    // 일정 추가
    const [schedules, setSchedules] = useState([{ id: 0, content: "", startTime: null, time : "" }]);
    // 선택한 날짜를 로컬 상태로 저장
    const [selectedDate, setSelectedDate] = useState(null);
    // 현재 시간을 가져오는 함수
    const getCurrentTime = () => new Date();
    const scheduleInput=useRef();
    const startTimeInput=useRef();

    // 일정 추가 버튼 누르면 일정 추가
    const handleAddSchedule = () => {
        setSchedules([...schedules, { id: 0, content: "", startTime: null, time : ""  }]);
    };

    // 삭제하기
    const handleDeleteSchedule = (index) => {
        fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/schedule/delete/${schedules[index].id}`, {
            method: 'DELETE',
            mode: 'cors'
        });

        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
    };

    useEffect(function () {
        const dateback = async (year, month, day) => {
            try {
                const date = `${year}-${month}-${day}`;

                const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/schedule/find/${date}`, {
                    method: 'GET',
                    mode: 'cors'

                });

                if (!response.ok) {
                    throw new Error('서버 응답이 실패하였습니다.');
                }

                const data = await response.json();

                // 중복된 데이터를 제외한 새로운 스케줄 목록
                const newSchedules = data.map(item => ({
                    id: item.id,
                    content: item.content,
                    startTime: new Date(item.date + ' ' + item.time),
                    time: item.time
                }));

                // 새로운 스케줄을 기존 스케줄에 추가
                setSchedules(newSchedules);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (selectedDate !== null) {
            const year = selectedDate.getFullYear().toString();
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = selectedDate.getDate().toString().padStart(2, '0');
            dateback(year, month, day);
        }
    }, [selectedDate]);


    const handleDateChange = async (date) => {

        if (date === null) {
            setSelectedDate(null);
        }

        else {
            setSelectedDate(date); // 선택한 날짜를 로컬 상태에 저장
        }
    };

    // 저장하기
    const handleSubmit=async ()=>{
        const year = selectedDate.getFullYear().toString();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const date = `${year}-${month}-${day}`;

        if(selectedDate===null){
            alert("날짜를 선택해주세요")
            return;
        }
        for (let i = 0; i < schedules.length; i++) {
            if (schedules[i].content.length < 1) {
                alert("일정을 입력해주세요")
                scheduleInput.current.focus();
                return;
            } else if (schedules[i].startTime == null) {
                alert("시간을 입력해주세요");
                return;
            }
        }

        for(let i=0;i<schedules.length;i++){
            const hour = schedules[i].startTime.getHours().toString().padStart(2, '0');
            const minute = schedules[i].startTime.getMinutes().toString().padStart(2, '0');
            schedules[i].time = hour + ':' + minute;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, schedules}),
            mode: 'cors'
        };

        fetch('https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/schedule/add', requestOptions)
            .then(response => response)
            .then(data => {
                console.log('submitted:', data);
            })
            .catch(error => {
                console.error('Error submitting:', error);
            });

        setSelectedDate(null);


        alert("저장성공!")
        setSchedules([
            {
                content: "",
                startTime: null,
            }
        ]);
    }

    return (
        <div className="card-container">
            <h2>일정 추가</h2>
            <div>
                <DatePicker className="date"
                            dateFormat="yyyy년 MM월 dd일 eee요일"
                            dateFormatCalendar="yyyy년 MM월"
                            locale={ko}
                            timeCaption="날짜 선택"
                            placeholderText="날짜 선택"
                            selected={selectedDate}
                            minDate={getCurrentTime()}
                            onChange={handleDateChange}
                            dayClassName={(date) =>
                                dayjs(date).day() === 6
                                    ? "saturday"
                                    : dayjs(date).day() === 0
                                        ? "sunday"
                                        : null
                            }
                />
            </div>

            {schedules.map((schedule, index) => (
                <div key={index}>
                    <div>
                        <input className={"schedule"}
                               ref={scheduleInput}
                               placeholder="일정"
                               value={schedule.content}
                               onChange={(e) => {
                                   const updatedSchedules = [...schedules];
                                   updatedSchedules[index].content = e.target.value;
                                   setSchedules(updatedSchedules);
                               }}
                        />
                    </div>
                    <div>
                        <DatePicker className={"start_time"}
                                    ref={startTimeInput}
                                    selected={schedule.startTime}
                                    onChange={(time) => {
                                        const updatedSchedules = [...schedules];
                                        updatedSchedules[index].startTime = time;
                                        setSchedules(updatedSchedules);
                                    }}
                                    locale={ko}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    minTime={getCurrentTime()}
                                    maxTime={dayjs().endOf("day").toDate()}
                                    timeCaption="Time"
                                    dateFormat="aa h:mm ~"
                                    placeholderText="시작 시간"
                                    className="start_time"
                        />

                        <Button
                            onClick={() => handleDeleteSchedule(index)}
                            name="delete-schedule"
                            color ="danger"
                            style = {{marginLeft:"10px"}}
                        >
                            삭제
                        </Button>
                    </div>
                </div>
            ))}


            <div>
                <Button onClick={handleAddSchedule}
                        name="schedule-bot"
                        style = {{marginRight:"10px"}}
                >일정 추가</Button>
                <Button onClick={handleSubmit}
                        name="save-bot"
                        color = "primary"
                >저장</Button>
            </div>
        </div>
    );
};

export default Cards;

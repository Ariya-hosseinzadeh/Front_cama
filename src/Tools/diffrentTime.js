import dayjs from 'dayjs'
function diffrentTime(TimeStart,TimeEnd) {
    const Time1 = dayjs(TimeStart)
    const Time2 = dayjs(TimeEnd)
    const age = Time2.diff(Time1, 'year')
    return age 
  }
export default diffrentTime
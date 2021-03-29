// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(record, clocking) {
    let TimeIn = {
        type: "TimeIn",
        date: clocking.split(" ")[0],
        hour: parseInt(clocking.split(" ")[1])
    }
    record.timeInEvents.push(TimeIn)
    return record
}

function createTimeOutEvent(record, clocking) {
    let TimeOut = {
        type: "TimeOut",
        date: clocking.split(" ")[0],
        hour: parseInt(clocking.split(" ")[1])
    }
    record.timeOutEvents.push(TimeOut)
    return record
}

function hoursWorkedOnDate(record, date) {
    // find timeInEvent and timeOutEvent with matching date
    let timeIn = record.timeInEvents.find(e => {return e.date === date})
    let timeOut = record.timeOutEvents.find(e => {return e.date === date})
    // subtract and divide to get 2 instead of 200
    return (timeOut.hour - timeIn.hour) / 100 
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let daysWorked = record.timeInEvents.map(e => {return e.date})
    let totalWages = daysWorked.reduce((total, date) => {
        return wagesEarnedOnDate(record, date) + total
    }, 0)
    return totalWages
}

function calculatePayroll(employees) {
    let emlpoyeesTotal = employees.map(e => {
        return allWagesFor(e)
    })
    let payroll = emlpoyeesTotal.reduce((total, wage) => {
        return wage + total
    })
    return payroll
}

function findEmployeeByFirstName(records, name) {
    return records.find(e => {return e.firstName === name})
}
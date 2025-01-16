import PropTypes from 'prop-types'


function Student({name, age, isStudent}){
    return(
        <div className = "student">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Student: {isStudent ? "Yes" : "No"}</p>
        </div>
    )
}



export default Student
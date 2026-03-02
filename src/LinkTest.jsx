import React from 'react'
import { Link } from 'react-router-dom'

function LinkTest() {
    return (
        <div>
            <ul className='grid gap-3 grid-cols-8 p-5'>
                <li><Link to='/labTestType'>Lab Test Types</Link></li>
                <li><Link to='/labTestCat'>Lab Test Categories</Link></li>
                <li><Link to='/labTestSpecimens'>Lab Test Specimens</Link></li>
                <li><Link to='/labTestsAttributes'>Lab Tests Attributes</Link></li>
                <li><Link to='/labTestsAttributesGroup'>Lab Tests Attributes Group</Link></li>
                <li><Link to='/labReportingFormats'>Lab Reporting Formats</Link></li>
                <li><Link to='/labTests'>Lab Tests</Link></li>
                <li><Link to='/labReceipt'>Lab Receipt</Link></li>
                </ul>
        </div>
    )
}

export default LinkTest

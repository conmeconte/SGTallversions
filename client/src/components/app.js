import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../assets/css/style.css'

import Header from './header';
import AddForm from './add_form'
import StudentListTable from './student_list_table';

const App = () => (
    <div>
        <div className="container">
            <Header/>
            <AddForm/>
            <StudentListTable/>
        </div>
    </div>
);

export default App;

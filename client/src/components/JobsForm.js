import React from 'react';

import { Spinner } from 'reactstrap';
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css';

function JobsListForm (props) {
    
    const data = props.jobsList
            
    return(
        <div>
            <br />
            <ReactTable
                data={data}
                columns={[
                    {
                        Header: "Jobs",
                        columns: [
                            { Header: "Title",       accessor: "title" },
                            { Header: "DatePosted",  accessor: "datePosted" },
                            { Header: "Description", accessor: "description" },
                            { Header: "Education Requirements", accessor: "educationRequirements" },
                            { Header: "Part/Full Time", accessor: "employmentType" },
                        ]
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                filterable={true}
            />
        </div>
    )    
}


class JobsForm extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            jobsUrl: 'http://localhost:8840/getDfeJobs',
            //jobsUrl: 'https://teaching-vacancies.service.gov.uk/api/v1/jobs.json',
            isJobsListLoaded : false,
            jobsList : null,
            error : null
        }

        this.retrieveJobsList = this.retrieveJobsList.bind(this);
    }

    componentDidMount() {
        this.retrieveJobsList();
    }

    retrieveJobsList() {
        const { jobsUrl } = this.state; 

        let lurl = jobsUrl;
 
        fetch(lurl, {
            method: "GET"
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.response)
                this.setState({
                    isJobsListLoaded: true,
                    jobsList: result.data         
                });
                //alert(JSON.stringify(result));
            },

            (error) => {
                this.setState({
                    isJobsListLoaded: true,
                    error
                });
                // alert(error);
            }
        ) 
    }
    

    render() {
        const { error, isJobsListLoaded, jobsList } = this.state;
        if (error) {
            return <div>
                        <p>Error: {error.message}</p>
                        <Spinner type="grow" color="danger" />
                    </div>
        } else if (!isJobsListLoaded) {
            return <div>
                        <p>Loading jobsList...</p>
                        <Spinner type="grow" color="warning" />
                    </div>
        } else {
            return (
                <div>
                    <br/>
                    <JobsListForm 
                        jobsList = {jobsList}
                    />    
                </div>
            );
        }
    };
}

export default JobsForm;
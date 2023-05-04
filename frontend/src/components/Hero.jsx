import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './css/JobList.css';
import JobDetails from './jobDetails/JobDetails';
import SearchJob from './header/SearchJob';
import CheckJobType from './header/CheckJobType';
import CheckWorkSetUp from './header/CheckWorkSetUp';
import JobList from './JobList';

const Hero = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleListItemClick = (item) => {
        setSelectedItem(item);
    };
    return (
        <>
            <div className="wrapper">
                <div className="jobsearch">
                    <Row>
                        <Col>
                            <SearchJob />
                        </Col>
                        <Col>
                            <CheckJobType />
                        </Col>
                        <Col>
                            <CheckWorkSetUp />
                        </Col>
                    </Row>
                </div>

                <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                    <Container className='joblist' style={{ width: '100vw' }} >
                        <Row>
                            <Col lg={12}>
                                <JobList onItemClick={handleListItemClick} />
                            </Col>
                            {/* <Col lg={4}>
      {selectedItem && <JobDetails selectedItem={selectedItem} />}
    </Col> */}
                        </Row>
                    </Container>
                </div >
            </div>
        </>
    )
}

export default Hero

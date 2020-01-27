import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import resultService from '../shared/services/searchResultsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';
import moment from 'moment';
import './resultview.css';
import {
  faPlay,
  faUser,
  faTable,
  faArrowRight,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';

const ResultView = props => {
  const [record, setRecord] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchRecord(id).then(res => setRecord(res.data));
  }, []);

  const fetchRecord = async id => {
    return await resultService.getSearchResult(id);
  };

  if (record === {}) return <p>Opps!</p>;

  console.log(record);

  return (
    <Container>
      <Row>
        <Col>
          <h1>
            <span className='pr-3'>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            {record.trackName}
          </h1>
        </Col>
        <Col>
          <h1>
            <span className='float-right'>
              <FontAwesomeIcon
                icon={resultService.getIconByKind(record.kind)}
              />
            </span>
          </h1>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <h5>
            <span className='pr-3'>
              <FontAwesomeIcon icon={faUser} />
            </span>
            {record.artistName}
          </h5>
        </Col>
        <Col>
          <h5 className='float-right'>
            <span className='pr-3'>
              <FontAwesomeIcon icon={faTable} />
            </span>
            {moment(record.releaseDate).format('MMMM Do YYYY')}
          </h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            <span className='pr-3'>
              <FontAwesomeIcon icon={faPlay} />
            </span>
            Preview
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactPlayer url={record.previewUrl} controls={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default ResultView;

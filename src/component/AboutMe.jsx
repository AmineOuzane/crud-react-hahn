import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';

// Make sure the path to your CSS file is correct
import '../style/AboutMe.css'; 

import SaaS from '../../src/images/saas 2.png';

/**
 * A reusable component for our animated content blocks.
 * REMOVED: The 'startVisible' prop is no longer needed.
 */
const ContentBlock = ({ imageSrc, title, text, imageSide = 'left' }) => {
  const { ref, inView } = useInView({
    // These options are perfect for our goal
    threshold: 0.15, 
    triggerOnce: true, 
    // REMOVED: The 'skip' option is no longer needed.
  });

  const imageCol = (
    <Col md={5} className="d-flex align-items-center justify-content-center">
      <Image src={imageSrc} rounded fluid />
    </Col>
  );

  const textCol = (
    <Col md={7} className="d-flex flex-column justify-content-center">
      <h2 className="mb-3">{title}</h2>
      {text}
    </Col>
  );

  return (
    // SIMPLIFIED: The className now only depends on the 'inView' state for all blocks.
    <div ref={ref} className={`content-block ${inView ? 'is-visible' : ''}`}>
      <Card className="shadow-lg border-0 rounded-3 p-4">
        <Card.Body>
          <Row className="g-4">
            {imageSide === 'left' ? [imageCol, textCol] : [textCol, imageCol]}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};


// --- Main AboutMe Component ---
export default function AboutMe() {
  const blocks = [
    {
      imageSrc: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      title: "Robust Fullstack Engineering",
      text: (
        <p className="lead">
          I build scalable and secure server-side applications using <strong>Java</strong> and <strong>Spring Boot</strong> with a fluid frontend using <strong>React</strong>. 
          My focus is on creating clean, efficient RESTful APIs, implementing complex business logic, and ensuring data integrity with databases like PostgreSQL and MySql, while currently developping my AWS Cloud Skills following a the Cloud Practionner and Solution Architect Certification on AWS.
        </p>
      ),
      imageSide: 'left',
    },
    {
      imageSrc: SaaS,
      title: "My recent project",
      text: (
        <p className="lead">
          My recent project and yet the most challenging one was a <strong>Full-Stack SaaS</strong> application using <strong>WhatsApp</strong>,<strong>Spring Boot</strong> and <strong>React</strong>.
          The purpose of the SaaS Application was to redirect all process to WhatsApp to have a optimized workflow that can be accessed from anywhere, anytime compared to standard ERP,CRM,Emails,...
        </p>
      ),
      imageSide: 'right',
    },
  ];

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="display-3">Hello, I'm Amine Ouzane</h1>
        <p className="lead text-muted">A Full-Stack Developer</p>
      </div>

      <Row className="justify-content-center">
        <Col md={11} lg={9}>
          {blocks.map((block, index) => (
            <ContentBlock
              key={index}
              imageSrc={block.imageSrc}
              title={block.title}
              text={block.text}
              imageSide={block.imageSide}
              // REMOVED: The 'startVisible' prop is no longer passed here.
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
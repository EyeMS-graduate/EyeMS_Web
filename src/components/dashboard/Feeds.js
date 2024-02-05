import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import {Link} from "react-router-dom";

const Feeds = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch("https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/notice/all");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">공지사항</CardTitle>
        <ListGroup flush className="mt-4">
          {notices.map((feed, index) => (
            (index < 7 &&
              <Link to={`/Notice/${feed.id}`} className="Buttons-link" style={{ textDecoration: 'none' }}>
                <ListGroupItem
                key={index}
                action
                href="/"
                tag="a"
                className="d-flex align-items-center p-3 border-0"
                >
                  {feed.title}
                  <small className="ms-auto text-muted text-small">
                    {feed.write_date}
                  </small>
                </ListGroupItem>
              </Link>)
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
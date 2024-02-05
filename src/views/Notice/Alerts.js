import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  CardTitle, Col, FormGroup, Input, Row, Table,
} from "reactstrap";

const Alerts = () => {
  const [notices, setNotices] = useState([]);
  const [searchOption, setSearchOption] = useState("title");
  const [searchKeyword, setSearchKeyword] = useState("");

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

   const handleSearch = async () => {
    if (searchOption === "title") {
      // 제목으로 검색하는 로직
      try {
        const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/notice/title/${searchKeyword}`);
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error searching by title:", error);
      }
    } else if (searchOption === "author") {
      // 작성자로 검색하는 로직
      try {
        const response = await fetch(`https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/notice/writer/${searchKeyword}`);
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error searching by author:", error);
      }
    }
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
      <div>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-2 mt-2 d-flex align-items-center">
            <h2 className="flex-grow-1 m-0">&nbsp;공지사항</h2>
            <Link to="/Write" className="Buttons-link">
              <Button className="btn" color="secondary">
                글쓰기
              </Button>
            </Link>
          </CardTitle>

          <CardBody className="">
            <Table striped>
              <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
              </thead>
              <tbody>
              {notices.map((notice) => (
                  <tr>
                    <th scope="row">{notice.id}</th>
                    <td style={{ width: '75%' }}>
                      <Link to={`/Notice/${notice.id}`} className="Buttons-link" style={{ textDecoration: 'none' }}>
                        {notice.title}
                      </Link>
                    </td>
                    <td>{notice.userID.split('@')[0]}</td>
                    <td>{notice.write_date}</td>
                  </tr>
              ))}
              </tbody>
            </Table>
          </CardBody>
          <CardBody>
            <Row>
              <Col md="2">
                <FormGroup>
                  <Input
                      type="select"
                      value={searchOption}
                      onChange={handleSearchOptionChange}
                  >
                    <option value="title">제목</option>
                    <option value="author">작성자</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <Input
                      type="text"
                      placeholder="검색어 입력"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="2">
                <Button onClick={handleSearch} color="secondary">
                  검색
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
  );
};

export default Alerts;
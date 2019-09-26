import React, { Fragment } from "react";
import _ from 'lodash';
import { Link } from "react-router-dom";
import { BreadcrumbList } from '_constants';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Breadcrumb = ({ match }) => {
  const path = match.url.substr(1);
  let paths = path.split("/");
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter(x => x.indexOf(":") === -1);
  }
  let pathname = "";
  paths.forEach((path, i) => {
    if (i < 3 && !_.includes(match.params,path)) {  
      pathname = `${pathname}${(i !== 0) ? '_' : ''}${path}`;
    }
  })
  return (
    <Fragment>
      <div className="admin_page_breadcrumb">
        <ul>
          {_.hasIn(BreadcrumbList, pathname) ?
            BreadcrumbList[pathname].map((bread, index) => {
              return (
                <li key={index}>
                  {BreadcrumbList[pathname].length !== index + 1 ? (
                    <Link to={`/${bread.path}`}>
                      {bread.title}
                    </Link>
                  ) : (
                      <Fragment>{`${bread.title}`}</Fragment>
                    )}
                </li>
              );
            })
            : null
          }
        </ul>
      </div>
    </Fragment>
  );
};

const UserBreadcrumb = ({ match }) => {
  const path = match.url.substr(1);
  let paths = path.split("/");
  console.log(paths)
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter(x => x.indexOf(":") === -1);
  }
  let pathname = "";
  paths.forEach((path, i) => {
    if (i < 3 && !_.includes(match.params,path)) {      
        pathname = `${pathname}${(i !== 0) ? '_' : ''}${path}`;
    }
  })
  return (
    <Fragment>
      <section className="user_page_breadcrumb">
        <Container>
          <Row>
            <ul>
              {_.hasIn(BreadcrumbList, pathname) ?
                BreadcrumbList[pathname].map((bread, index) => {
                  return (
                    <li key={index}>
                      {BreadcrumbList[pathname].length !== index + 1 ? (
                        <Link to={`/${bread.path}`}>
                          {bread.title}
                        </Link>
                      ) : (
                          <Fragment>{`${bread.title}`}</Fragment>
                        )}
                    </li>
                  );
                })
                : null
              }
            </ul>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { Breadcrumb, UserBreadcrumb };

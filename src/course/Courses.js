import React from 'react';
import { Button, Container, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CourseCard from './components/CourseCard';
import FlexContainer from '../UI/flexContainer/FlexContainer';
import Header from '../UI/header/Header';
import { COURSE_BASE_URL } from '../routes/URLMap';
import { fetchCourses } from '../utils/api/course';

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            pagination: {},
        };
    }

    componentDidMount() {
        fetchCourses().then(this.updateCourseData);
    }

    updateCourseData = courseData => {
        this.setState({
            courses: courseData.courses,
            pagination: courseData.pagination,
        })
    }

    handlePageChange = (event, data) => {
        fetchCourses(data.activePage).then(this.updateCourseData);
    }

    render() {
        const currentPath = this.props.location.pathname;

        return (
            <React.Fragment>
                <Header as="h2" textAlign="center">
                    Courses
                </Header>
                <Container>
                    <Button as={Link} to={`${currentPath}/new`} primary>
                        Create New Course
                    </Button>
                    <FlexContainer justifyContentValue="space-between">
                        {this.state.courses.map(course => (
                            <CourseCard
                                courseDescription={course.description}
                                courseImage={course.image}
                                courseName={course.name}
                                key={course.code}
                                to={`${COURSE_BASE_URL}/${course.code}`}
                            />
                        ))}
                    </FlexContainer>
                    {
                        this.state.pagination.page && (
                            <FlexContainer justifyContentValue="center">
                                <Pagination
                                    activePage={this.state.pagination.page}
                                    onPageChange={this.handlePageChange}
                                    totalPages={this.state.pagination.pages}
                                />
                            </FlexContainer>
                        )
                    }
                </Container>
            </React.Fragment>
        );
    }
};

export default Courses;

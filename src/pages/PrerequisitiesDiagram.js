import React, {Component} from "react";
import {Button, Select, Popover, Tag} from "antd";
import TermSelector from "../components/TermSelector";
import DepartmentSelector from "../components/DepartmentSelector";
import { prerequisities } from "../configs/prerequisities";
import { DEPARTMENT_COURSES } from "../configs/constants";
import { colors } from "../configs/constants";

const ButtonGroup = Button.Group;
const { Option } = Select;

//returns string d of svg path
export const findD = (xBegin, yBegin, xEnd, yEnd) => {
    const controlPoint1 = [(xEnd + xBegin) / 2, yBegin];
    const controlPoint2 = [(xEnd + xBegin) / 2, yEnd];
    return `M ${xBegin} ${yBegin} C ${controlPoint1[0]} ${controlPoint1[1]} ${
        controlPoint2[0]
        } ${controlPoint2[1]} ${xEnd} ${yEnd}`;
};

const Box = props => <button style={{...styles.boxStyle(props.boxWidth, props.boxHeight, props.margin), ...props.style}}>
    {props.label}
</button>;

class PrerequisitiesDiagram extends Component {
    state = {
        terms: [],
        pre: {},
        inversePre: {},
        courses: DEPARTMENT_COURSES["tek"],
        preCourses: null,
        courseName: null,
        termIndex: null,
        courseIndex: null,
        flag: false,
        paths: null,
        boxWidth: 120,
        boxHeight: 56,
        margin: 24,
    };

    constructor(props) {
        super(props);
        this.button = {};
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.setPre();
        window.addEventListener("scroll", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleResize);
    }

    setPre = () => {
        this.drawPaths();
        const allPre = this.setTermPrerequisities(this.state.courses);
        this.setState({
            pre: allPre.pre,
            inversePre: allPre.inversePre
        });
    };

    setTermPrerequisities = (courses) => {
        const allCourses = courses.reduce((acc, term) => {
            term.forEach((course) => {
                if(typeof course === "string") {
                    acc.push(course);
                }
                else if(typeof course === "object" && course.course != null) {
                    acc.push(course.course);
                }
            });
            return acc;
        }, []);
        const allPre = allCourses.reduce((acc, course) => {
            const pre = this.findPreNodeCount(course);
            acc["pre"][course] = pre;
            pre.forEach((p) => {
                if(acc["inversePre"][p] == null) {
                    acc["inversePre"][p] = [course];
                }
                else {
                    acc["inversePre"][p].push(course);
                }
            });
            return acc;
        }, {pre: {}, inversePre: {}});

        return allPre;
    };

    drawPaths = (_courses = this.state.courses) => {
        const { boxWidth, margin } = this.state;
        const paths = _courses.reduce((acc, term) => {
            term.forEach((_course) => {
                const course = (_course.course != null && _course.course.length !== 0) ? _course.course : _course;
                if(prerequisities[course] != null) {
                    const targets = prerequisities[course].courses;
                    if(this.button[course]) {
                        const current = this.button[course].getBoundingClientRect();
                        targets.forEach((targetStr) => {
                            if(this.button[targetStr] != null) {
                                const target = this.button[targetStr].getBoundingClientRect();
                                acc.push(<path
                                    key={course+targetStr+term}
                                    d={findD(current.x + this.containerRef.current.scrollLeft + window.pageXOffset, current.y + window.pageYOffset - 20, target.x + boxWidth / 2 + margin + this.containerRef.current.scrollLeft + window.pageXOffset, target.y + window.pageYOffset - 20)}
                                    stroke="black"
                                    strokeWidth={5}
                                    fill="none"/>);
                            }
                        });
                    }
                }
            });
            return acc;
        }, []);
        this.setState({
            paths: <svg style={{position: "absolute", height: this.containerRef.current.getBoundingClientRect().height, width: 1440}}>
                {paths}
            </svg>
        });
    };

    handleResize = () => {
        this.drawPaths();
    };

    isActive = (currentCourseName) => {
        const { preCourses } = this.state;
        return preCourses == null || preCourses.includes(currentCourseName);
    };

    handleCourseClick = (termIndex, courseIndex, courseName, event) => {
        if(courseName == null || courseName.length === 0) { event.stopPropagation(); return;}
        const { pre, inversePre } = this.state;
        const { [courseName]: inverseP = [] } = inversePre;
        const { [courseName]: p = [] } = pre;
        const isSameCourse = this.state.termIndex === termIndex && this.state.courseIndex === courseIndex;
        const preCourses = [...p, courseName, ...inverseP];
        this.setState({
            courseName: isSameCourse ? null : courseName,
            termIndex: isSameCourse ? null : termIndex,
            courseIndex: isSameCourse ? null : courseIndex,
            preCourses: isSameCourse ? null : preCourses,
            paths: null
        }, () => {
            isSameCourse ?
                this.drawPaths() :
                this.drawPaths([[courseName, ...(this.state.preCourses || [])]]);
        });

    };

    handleZoomOut = () => {
        const { boxHeight, boxWidth, margin } = this.state;
        this.setState({
            boxHeight: boxHeight - 10 <= 0 ? boxHeight : boxHeight - 10,
            boxWidth: boxWidth - 10 <= 0 ? boxWidth : boxWidth - 10,
            margin : margin - 10 <= 0 ? margin : margin - 10
        }, () => this.drawPaths());
    };

    handleZoomIn = () => {
        const { boxHeight, boxWidth, margin } = this.state;
        this.setState({
            boxHeight: boxHeight + 10,
            boxWidth: boxWidth + 10,
            margin: margin + 10 > 200 ? margin : margin + 10
        }, () => this.drawPaths());
    };

    handleTermChange = (terms) => {
        this.setState({
            terms
        });
    };

    handleDepartmentChange = (key) => {
        this.setState({
            courses: DEPARTMENT_COURSES[key]
        }, () => {
            this.setPre();
        });
    };

    isInTerm = (course) => {
        for(let termIndex in this.state.courses) {
            const term = this.state.courses[termIndex];
            for(let courseIndex in term) {
                const _course = term[courseIndex];
                if(_course === course) {
                    return true;
                }
            }
        }
        return false;
    };

    findPreNodeCount = (course) => {
        if(prerequisities[course] != null) {
            return prerequisities[course].courses.reduce((acc, _course) => {
                if(this.isInTerm(_course)) {
                    acc = [
                        _course,
                        ...acc,
                        ...this.findPreNodeCount(_course)];
                }
                return acc;
            }, []);
        }
        return [];
    };

    findButtonColor = (c) => {
        const { inversePre } = this.state;
        if(inversePre[c] != null) {
            const colorIndex = inversePre[c].length > 8 ? 8 : inversePre[c].length;
            return colors[colorIndex];
        }
        return colors[0];
    };

    handleCourseSelect = (course, termIndex, courseIndex, rest) => {
        console.log(rest);
        const newCourse = this.state.courses;
        newCourse[termIndex][courseIndex].course = course;
        const allPre = this.setTermPrerequisities(newCourse);
        this.setState({
            courses: newCourse,
            pre: allPre.pre,
            inversePre: allPre.inversePre
        }, () => {
            this.drawPaths();
        });
    };

    renderPopover(pres) {
        if(pres == null) { return <span>No Prerequisities</span>}
        return <>
            {pres.courses.map((course) => <Tag>{course}</Tag>)}
            </>
    };

    renderSelector = (course, termIndex, courseIndex) => {
        const { boxHeight, boxWidth, margin } = this.state;
        return <div key={course.course + termIndex + courseIndex} ref={(ref) => this.button[course.course] = ref}>
            <Popover content={JSON.stringify(prerequisities[course.course])} title={"Önşartlar"}>
                <Button style={{
                    ...styles.boxStyle(boxWidth, boxHeight, margin),
                    zIndex: 10,
                    backgroundColor: this.findButtonColor(course.course),
                    visibility: this.isActive(course.course) ? "visible": "hidden"}}
                        onClick={(event) => this.handleCourseClick(termIndex, courseIndex, course.course, event)}
                >
                    <Select style={{ width: this.state.boxWidth}}
                            dropdownMatchSelectWidth={false}
                            value={course.course}
                            onChange={(value, ...rest) => this.handleCourseSelect(value, termIndex, courseIndex, rest)}>
                        {course.options.map((_course) => <Option key={_course} value={_course}>{_course}</Option>)}
                    </Select>
                </Button>
            </Popover>
        </div>
    };

    renderBox = (c, i, index) => {
        const { boxHeight, boxWidth, margin } = this.state;
        if(typeof c === "string") {
            return <div key={c} ref={(ref) => this.button[c] = ref}>
                <Popover content={this.renderPopover(prerequisities[c])} title={"Önşartlar"}>
                    <Button
                        style={{
                            ...styles.boxStyle(boxWidth, boxHeight, margin),
                            backgroundColor: this.findButtonColor(c),
                            visibility: this.isActive(c) ? "visible": "hidden",
                            opacity: this.isActive(c) ? 100 : 0,
                            transition: "visibility 0.3s linear, opacity 0.3s linear"
                        }}
                        onClick={() => this.handleCourseClick(index, i, c)}>
                        {c}
                    </Button>
                </Popover>
            </div>
        }
        return this.renderSelector(c, index, i);
    };

    render() {
        const { terms, paths, boxHeight, boxWidth, margin, courses} = this.state;
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", margin: 10 }}>
                        <DepartmentSelector onChange={this.handleDepartmentChange}/>
                    </div>
                    <div style={{ display: "flex", margin: 10 }}>
                        <TermSelector onChange={this.handleTermChange}/>
                    </div>
                    <div style={{ display: "flex", margin: 10 }}>
                        <ButtonGroup>
                            <Button onClick={this.handleZoomOut} icon={"zoom-out"} shape={"circle"}/>
                            <Button onClick={this.handleZoomIn} icon={"zoom-in"} shape={"circle"}/>
                        </ButtonGroup>
                        <ButtonGroup style={{ marginLeft: 10 }}>
                            {colors.map((color, index) => <Button key={color} style={{ backgroundColor: color }}>{index}</Button>)}
                        </ButtonGroup>
                    </div>
                </div>
                <div ref={this.containerRef} style={{height: "100%", width: "100%", backgroundColor: "white" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {courses.map((course, index) => {
                            if(!terms.includes("" + index) && terms.length !== 0) { return <></> }
                            return <div key={"donem" + index} style={index === 0 || terms[0] === "" + index ? { marginLeft: 100 } : {}}>
                                <Box style={{color: "black", backgroundColor: "#c0cec6"}}
                                     margin={margin}
                                     boxWidth={boxWidth}
                                     boxHeight={boxHeight}
                                     label={index + 1 + ". Dönem"}/>
                                {course.map((c, i) => this.renderBox(c, i, index))}
                            </div>
                        })}
                        {paths}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    boxStyle: (boxWidth, boxHeight, margin) => ({
        width: boxWidth,
        height: boxHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: margin,
        transform: "translate(-50%)",
        color: "white",
        zIndex: 10,
    })
};

export default PrerequisitiesDiagram;
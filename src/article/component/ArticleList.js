import React, {Component} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {Card, CardActions} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {Link} from "react-router";
import Divider from "material-ui/Divider";
import {articleActions} from "~/article";
import dateformat from "dateformat";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";

class ArticleList extends Component {

    constructor(){
        super();
        this.search = this.search.bind(this);
    }

    componentWillMount() {
        this.props.loadArticles(function () {
            },
            (() => {
                this.props.filterArticles({
                    title: this.refs.title.getValue()
                });
            }).bind(this)
        );
    }

    componentWillUnmount() {
        this.props.unloadArticles();
    }

    search(){
        this.props.filterArticles({
            title: this.refs.title.getValue()
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={{margin: 10}}>
                    <Card>
                        <CardActions>
                            <TextField
                                hintText="제목, 내용 , 이름으로 검색"
                                floatingLabelText="검색어"
                                ref="title"
                            />
                            <RaisedButton label="검색" onTouchTap={this.search}/>
                            <RaisedButton label="추가" primary={true}
                                          containerElement={<Link to="/articles/form"/>}
                            />
                            <RaisedButton label="삭제" secondary={true}/>
                        </CardActions>
                        <Divider />
                        <List
                            articles={this.props.articles}
                        />
                        <Pagination/>
                    </Card>
                </div>
            </div>
        );
    }
}

class Search extends Component {
    render() {
        return (<div></div>);
    }
}

class List extends Component {
    render() {
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>
                                No
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                title
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                date
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                hit
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                author
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            this.props.articles.map((row, index) => {
                                const formattedDate = (_date) => (dateformat(new Date(_date), "yyyy-mm-dd"));
                                const date = ((row) => {
                                    if (row.updateDate) return formattedDate(row.updateDate);
                                    return formattedDate(row.createDate);
                                })(row);
                                return (
                                    <TableRow key={row.id}>
                                        <TableRowColumn>{row.no}</TableRowColumn>
                                        <TableRowColumn>
                                            <Link to={`/articles/${row.id}`}>{row.title}</Link>
                                        </TableRowColumn>
                                        <TableRowColumn>{date}</TableRowColumn>
                                        <TableRowColumn>{row.hit}</TableRowColumn>
                                        <TableRowColumn>{row.author}</TableRowColumn>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TableFooter/>
                </Table>
            </div>
        );
    }
}

class Pagination extends Component {
    render() {
        return (<div></div>);
    }
}

const mapStateToProps = createSelector(
    (state) => state.articles,
    (articles) => ({
        articles
    })
);

const mapDispatchToProps = Object.assign(
    {},
    articleActions
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);



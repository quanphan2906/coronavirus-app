import React from "react";
import { withRouter } from "react-router-dom";

function NavButton(props) {
    const { currentPage, totalPage } = props;
    const currentUrl = props.match.path.split(":")[0];
    const handleNav = nextPage => {
        if (nextPage > 0 && nextPage <= totalPage) {
            props.history.push(currentUrl + nextPage);
        }
    };
    return (
        <div>
            <div className="button-container col l12 center">
                <button className="btn btn-floating pink">
                    <i
                        className="material-icons"
                        onClick={() => {
                            handleNav(Number(currentPage) - 1);
                        }}
                    >
                        {" "}
                        navigate_before{" "}
                    </i>
                </button>
                <span className="page-num-container">
                    {currentPage + "/" + totalPage}
                </span>
                <button className="btn btn-floating pink">
                    <i
                        className="material-icons"
                        onClick={() => {
                            handleNav(Number(currentPage) + 1);
                        }}
                    >
                        {" "}
                        navigate_next{" "}
                    </i>
                </button>
            </div>
        </div>
    );
}

export default withRouter(NavButton);

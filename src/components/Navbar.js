import React, { Component } from 'react';

class Navbar extends Component{
    render() {
        return (
            <div className="Navbar">
                <div className="LeftSide">
                    <div className="Links">
                    <a href="/partner">프리미엄 파트너</a>
                    <a href="/child">일반 파트너</a>
                    <a href="/community">자유 수강생</a>
                    <a href="/inquiry">일반 수강생</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;

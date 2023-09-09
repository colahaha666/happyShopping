const Nearby = () => {

    return (
        <div className="page nearby-page">
            <div className="title">切换门店</div>
            <div className="title">按位置选择</div>
            <input type="text" className="search" />
            <div className="subtitle">按门店选择</div>
            <ul className="list">
                <li className="list-item">
                    <div className="list-item-left">
                        <div className="list-item-title">优果购</div>
                        <p className="list-item-desc">联系电话：17194091107</p>
                        <p className="list-item-desc">北京市昌平区南邵镇四合园59号</p>
                    </div>
                    <div className="list-item-right">
                        <span className="iconfont">&#xe61c;</span>799m

                    </div>
                </li>
                <li className="list-item">
                    <div className="list-item-left">
                        <div className="list-item-title">优果购</div>
                        <p className="list-item-desc">联系电话：17194091107</p>
                        <p className="list-item-desc">北京市昌平区南邵镇四合园59号</p>
                    </div>
                    <div className="list-item-right">
                        <span className="iconfont">&#xe61c;</span>799m

                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Nearby;

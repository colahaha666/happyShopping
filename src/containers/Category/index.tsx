import './style.scss';

const Category = () => {
    return (
        <div className='page category-page'>
            <div className="title">
                分类
            </div>
            <div className="search">
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe6e1;</div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder='请输入商品名称'
                    />
                </div>
            </div>
            <div className="category">
                <div className="category-item category-item-active">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
                <div className="category-item">新鲜水果</div>
            </div>
            <div className="tag">
                <div className="tag-item tag-item-active">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
                <div className="tag-item">全部</div>
            </div>
            <div className="product">
                <div className="product-title">精选商品（50）</div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
                <div className="product-item">
                    <img
                        className="product-item-image"
                        src='http://statics.dell-lee.com/shopping/category-list-1.png'
                        alt=''
                    />
                    <div className="product-item-content">
                        <div className="product-item-title">华都食品 鸡翅中 1000g/ ...</div>
                        <div className="product-item-sales">月售156</div>
                        <div className="product-item-price">
                            <span className="product-item-price-yen">&yen;</span>59.9
                        </div>
                        <div className="product-item-button">购买</div>
                    </div>
                </div>
            </div>

            <div className="docker">
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe604;</p>
                    <p className='docker-ite-title'>首页</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon docker-item-active'>&#xe60d;</p>
                    <p className='docker-ite-title'>分类</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe600;</p>
                    <p className='docker-ite-title'>购物车</p>
                </div>
                <div className="docker-item">
                    <p className='iconfont docker-item-icon'>&#xe61c;</p>
                    <p className='docker-ite-title'>我的</p>
                </div>
            </div>
        </div>
    );
}

export default Category;

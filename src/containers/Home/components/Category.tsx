import { CategoriesType } from "../types"

type CateGoryPropsType = {
    categories: CategoriesType | undefined,
}

const CateGory = (props: CateGoryPropsType) => {
    const { categories } = props
    return (
        <div className="category">
            {
                (categories || []).map(item => {
                    return (
                        <div className="category-item" key={item.id}>
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                className='category-item-img'
                            />
                            <p className='category-item-desc'>{item.name}</p>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default CateGory;
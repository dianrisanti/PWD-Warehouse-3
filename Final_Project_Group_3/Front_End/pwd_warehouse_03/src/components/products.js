import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { 
    Card,
    Dropdown,
    Pagination,
    Button 
} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Product = () => {
    const { products } = useSelector((state) => {
        return{
            products: state.product.products
        }
    })

    // filter harga dan nama
    const options = [
        'Nama A - Z',
        'Nama Z - A',
        'Harga Tertinggi',
        'Harga Terendah',
    ]
    const [selectedOption, setSelectedOption] = React.useState("")

    const handleClickListItem = (index) => {
        const input = options[index]
        setSelectedOption(input)

        if(index === 0) return products.sort((a,b) => a.name.localeCompare(b.name))
        if(index === 1) return products.sort((a,b) => -1 * a.name.localeCompare(b.name))
        if(index === 2) return products.sort((a,b) => b.price - a.price)
        if(index === 3) return products.sort((a,b) => a.price - b.price)
    }

    // filter kategori
    const optionsCate = ['All']
    for(let entry of products){
        const existingEntry = optionsCate.find(o => o === entry.category)
        if(!existingEntry){
            optionsCate.push(entry.category)
        }
    }

    // pagination
    const [selectedCate, setSelectedCate] = React.useState("")
    const itemsPerPage = 12
    const [page, setPage] = React.useState(1)
    const noOfPages = selectedCate ? 1 : Math.ceil(products.length / itemsPerPage)
    const listItem = Array(noOfPages).fill(1)


    const handleClickListItemCate = (index) => {
        const input = optionsCate[index]
        setSelectedCate(input)
        
        if(input === 'All') return setSelectedCate("")
        setPage(1)
    }

    
    const goToDetail = (index) => {
        console.log(index)
        return <Redirect to={`/detail?id=${index}`}/>
    }

    return (
        <div style={{padding: 10, margin: 25, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px', marginLeft: 60}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '40px'}}>
                <div style={{display: 'flex', flexDirection: 'row', width: 300}}>
                    <h3 style={{marginRight: 10}}>Kategori</h3>
                    <Dropdown style={{}}>
                            <Dropdown.Toggle style={{backgroundColor: "transparent", fontFamily: "Dosis", width: '170px', color: 'black'}} id="dropdown-basic">
                                {selectedCate ? selectedCate  : "Berdasarkan"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{height: '200px', overflowY: 'scroll'}}>
                                {optionsCate.map((item, index) => {
                                    return (
                                        <Dropdown.Item key={index} onClick={() => handleClickListItemCate(index)}>{item}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3 style={{marginRight: 10}}>Urutkan</h3>
                    <Dropdown style={{marginRight: "4%"}}>
                            <Dropdown.Toggle style={{backgroundColor: "transparent", fontFamily: "Dosis", color: 'black'}} id="dropdown-basic">
                                {selectedOption ? selectedOption  : "Berdasarkan"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {options.map((item, index) => {
                                    return(
                                        <Dropdown.Item key={index} onClick={() => handleClickListItem(index) }>{item}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap'}}>
                {
                    selectedCate[0]
                    ?
                    products
                        .filter(item => item.total_stock !== 0)
                        .filter(item => item.category === selectedCate)
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((item, index) => {
                            return(
                                <Card style={styles.card} key={index} onClick={() => goToDetail(item.id)}>
                                    <Card.Img variant="top" src={item.images} />
                                    <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text style={{height: "4rem", fontSize: "20px"}}>
                                            IDR {item.price.toLocaleString()}
                                        </Card.Text>
                                        <Button style={{margin: "20px 10px", backgroundColor: '#118ab2'}} as={Link} to={`/detail?id=${item.id}`}>
                                            <i className="fas fa-shopping-cart"></i> Buy</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    :
                    products
                        .filter(item => item.total_stock !== 0)
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((item, index) => {
                            return(
                                <Card style={styles.card} key={index}>
                                    <Card.Img variant="top" src={item.images} />
                                    <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text style={{height: "4rem", fontSize: "20px"}}>
                                            IDR {item.price.toLocaleString()}
                                        </Card.Text>
                                        <Button style={{margin: "20px 10px", backgroundColor: '#118ab2'}} as={Link} to={`/detail?id=${item.id}`}>
                                        <i class="fas fa-shopping-cart"></i> Buy</Button>
                                    </Card.Body>
                                </Card>
                            )
                    })
                }
            </div>

            <div>
                <Pagination>
                    <Pagination.Prev disabled={page <= 1 ? true : false} onClick={() => setPage(page - 1)} />
                    {listItem.map((item, index) => {
                        return (
                            <Pagination.Item key={index} active={index+1 === page} onClick={() => setPage(index+1)}>{index+1}</Pagination.Item>
                        )
                    })}
                    <Pagination.Next disabled={page >= noOfPages ? true : false} onClick={() => setPage(page + 1)} />
                </Pagination>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex", 
        flexWrap: "wrap",
        justityContent: "space-between", 
    },
    card: {
        width: "16.5rem",  
        margin: "10px",
    }
}

export default Product
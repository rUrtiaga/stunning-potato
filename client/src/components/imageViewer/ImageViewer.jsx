import React from "react"
import Card from "@material-ui/core/Card"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import defaultImage from "../../assets/images/search/search-logo-big.png"

//recibe una lista de imagenes y las convierte en divs con imagenes para utilziar en el carousel
function deployImages(images) {
    return images.map(i => {
        return (
            <div key={i}>
                <img src={i} alt="" />
            </div>
        )
    })
}

//recibe por props.pics una lista de URL de imagenes y las despliega en un carousel
export default function ImageViewer(props) {
    return (
        <Card>
            <Carousel>
                {props.pics ? (
                    deployImages(props.pics)
                ) : (
                    <div>
                        <img src={defaultImage} alt="" />
                    </div>
                )}
            </Carousel>
        </Card>
    )
}

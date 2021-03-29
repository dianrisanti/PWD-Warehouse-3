import React from 'react'
import { Image } from 'react-bootstrap'

const Footer = () => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '95vw', padding: 20, marginLeft: 25, marginTop: 85}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90vw'}}>
                <div>
                    <h5>LAYANAN PELANGGAN</h5>
                    <p style={{color: '#6c757d'}}>Bantuan</p>
                    <p style={{color: '#6c757d'}}>Metode Pembayaran</p>
                    <p style={{color: '#6c757d'}}>Lacak Pesanan Pembeli</p>
                    <p style={{color: '#6c757d'}}>Hubungi Kami</p>
                </div>
                <div>
                    <h5>JELAJAHI</h5>
                    <p style={{color: '#6c757d'}}>Tentang Kami</p>
                    <p style={{color: '#6c757d'}}>Kebijakan Privasi</p>
                    <p style={{color: '#6c757d'}}>Blog</p>
                    <p style={{color: '#6c757d'}}>Seller Center</p>
                </div>
                <div>
                    <h5>IKUTI KAMI</h5>
                    <p style={{color: '#6c757d'}}><i class="fab fa-facebook-f"></i> Facebook</p>
                    <p style={{color: '#6c757d'}}><i class="fab fa-instagram"></i> Instagram</p>
                    <p style={{color: '#6c757d'}}><i class="fab fa-twitter"></i> Twitter</p>
                    <p style={{color: '#6c757d'}}><i class="fab fa-line"></i> Line</p>
                </div>
                <div>
                    <h5>DOWNLOAD APLIKASI</h5>
                    <Image
                        src="https://www.freepnglogos.com/uploads/app-store-logo-png/apple-app-store-travel-awards-globestamp-7.png"
                        style={{width: '250px', height: '180px'}}
                    />
                </div>
            </div>

            <div>
                <p style={{color: '#6c757d'}}><i class="far fa-copyright"></i> Electronic Shop 2021. Hak Cipta Dilindungi</p>
            </div>

        </div>
    )
}

export default Footer
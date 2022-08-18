import CNAE from "../CNAE.json"

export function getSegmentos() {
    return Object.keys(CNAE)
}

export function getAtividadesPorSegmento(segmentoParam) {
    const cnae = getInfoDropdown()
    const objeto = []

    cnae.map((segmento) => {
        if(segmento[0] === segmentoParam){
            segmento[2].map((divisao) => {
                divisao[2].map((grupo) => {
                    objeto.push(grupo)
                })
            })
        }
    })
    
    return objeto;
}

export function getInfoDropdown() {

    const objeto = []
    const segmentos = Object.entries(CNAE).map(([key, value]) => ({ [key]: value }));
    
    segmentos.map((segmento) => {
        const item = []
        
        const composicaoN1 = Object.entries(segmento)[0]
        item.push(composicaoN1[0])
        item.push(composicaoN1[1].descricao)
        
        const divisoes = Object.entries(composicaoN1[1].divisoes).map(([key, value]) => ({ [key]: value }));
        
        const item2 = []
        divisoes.map((divisao) => {
            const subItem2 = []

            const composicaoN2 = Object.entries(divisao)[0]
            subItem2.push(composicaoN2[0])
            subItem2.push(composicaoN2[1].descricao)

            const grupos = Object.entries(composicaoN2[1].grupos).map(([key, value]) => ({ [key]: value }));
            
            const item3 = []
            grupos.map((grupo) => {
                const subItem3 = []
                
                const composicaoN3 = Object.entries(grupo)[0]
                subItem3.push(composicaoN3[0])
                subItem3.push(composicaoN3[1].descricao)
                subItem3.push(composicaoN3[1].classes)

                item3.push(subItem3)
            })
            subItem2.push(item3)  

            item2.push(subItem2)  
        })
        item.push(item2)

        objeto.push(item)
    })

    return objeto
}



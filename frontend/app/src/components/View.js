import {useEffect, useState} from "react";
import axios from "axios"

const View = props => {
    const [view, setView] = useState([]);

    useEffect(() => {
        axios.get('/api/database/personalize/view')
            .then(response => {
                setView(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <tbody>
            {view.map(item => (
                <tr key={item.id}>
                    <td>{item.fullName}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.placeOfBirth}</td>
                    <td>{item.gender}</td>
                    <td>{item.inn}</td>
                    <td>{item.snils}</td>
                    <td>{item.contactInfo}</td>
                    <td>{item.address}</td>
                    <td>{item.documentType}</td>
                    <td>{item.documentNumber}</td>
                </tr>
            ))}
        </tbody>
    );
}
export default View;
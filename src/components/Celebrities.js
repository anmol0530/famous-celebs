import { useState } from 'react';
import celebrities from '../config/celebrities.json';
import { Celebrity } from './Celebrity';
import "../styles/Celebrities.css";
import { blackCross, search } from '../images';

const newCelebs = celebrities.map(celeb => {
    let ageInMilliseconds = new Date() - new Date(celeb.dob);
    let age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
    let name = celeb.first + " " + celeb.last;
    return { ...celeb, name: name, age: age };
});

export const Celebrities = () => {
    const [celebs, setCelebs] = useState(newCelebs);
    const [delPop, setDelPop] = useState(false);
    const [delId, setDelId] = useState();
    const [active, setActive] = useState('');
    const [editable, setEditable] = useState('');
    const [query, setQuery] = useState("");
    
    const openPopup = (id) => {
        setDelId(id);
        setDelPop(true);
    }
    const onDelete = (id) => {
        const newCelebs = celebs.filter(celeb => id !== celeb.id);
        setCelebs(newCelebs);
        setDelPop(false);
    }
    const handleSubmit = (updatedCeleb) => {
        const newCelebs = celebs.map(celeb => {
            if (celeb.id === updatedCeleb.id) {
                return {...celeb, ...updatedCeleb}
            }
            return celeb;
        });
        setCelebs(newCelebs);
    }
    const filteredCelebs = celebs.filter(celeb => {
        if (query === "") {
            return celeb;
        } else if (celeb.name.toLowerCase().includes(query.toLowerCase())) {
            return celeb;
        }
    });
    return (
        <>
            <div className="search accordion">
                <img src={search} />
                <input type="text" placeholder="Search user" onChange={event => setQuery(event.target.value)} className="search-bar" />
            </div>
            {filteredCelebs.map((celeb) =>
                <Celebrity celeb={celeb}
                    key={celeb.id}
                    active={active}
                    setActive={setActive}
                    onDelete={openPopup}
                    editable={editable}
                    setEditable={setEditable}
                    onSubmit={handleSubmit}
                />)}
            {delPop &&
                <div className='popup'>
                    <div className="popup-wrapper">
                        <div className="header">
                            <p>Are you sure you want to delete?</p>
                            <img src={blackCross} alt="" className='black-cross' onClick={() => setDelPop(false)} />
                        </div>
                        <div className="buttons">
                            <button className="btn cancel" onClick={() => setDelPop(false)}>
                                Cancel
                            </button>
                            <button className="btn delBtn" onClick={() => onDelete(delId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
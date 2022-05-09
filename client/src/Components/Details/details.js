import React from 'react';
import { connect } from 'react-redux';
import { getRecipeById, deleteRecipe } from '../../Reducer/actions';
import Loading from '../Loading/loading';
import Error from '../Error/error'
import s from './details.module.css';

export class DetailRecipe extends React.Component {
    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
        let id = this.props.id
        this.props.getRecipeById(id)
    }

    // handleDelete(e) {
    //     e.preventDefault();
    //     this.props.deleteRecipe(e.target.value);
    //     alert('Successfully deleted recipe')
    //     this.props.navigate('/home')
    // }
    handleBack(e) {
        e.preventDefault();
        this.props.navigate('/home')
    }
    render() {
        let founded;
        if (this.props.details) {
            console.log(this.props.details.diets)
            founded = this.props.details.name ? false : true;
        }
        return (
            <div>
                {
                    this.props.loading ? (<Loading />)
                        : founded ? (
                            <div className={s.detailsContainer}>
                                <div className={s.detailsHead}>
                                    <img className={s.detailsImg} src={this.props.details.image} alt={this.props.details.title} />
                                    <div className={s.infoContainer}>
                                        <h1 className={s.detailsTitle}>{this.props.details.title}</h1>
                                    </div>
                                    <button className={s.detailsBackBtn} onClick={this.handleBack}>X</button>
                                </div>
                                <div className={s.detailsText}>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Diets</b></p>
                                        <div className={s.detailsDiets}>{this.props.details.diets?.map(e => `${e.name ? e.name : e}, `)}</div>
                                    </div>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Health Score: </b>{this.props.details.healthScore}</p>
                                    </div>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Food Score: </b>{this.props.details.spoonacularScore}</p>
                                    </div>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Ready: </b>in {this.props.details.minutes} minutes</p>
                                    </div>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Summary</b></p>
                                        <div dangerouslySetInnerHTML={{ __html: this.props.details.summary }}></div>
                                    </div>
                                    <div className={s.infoContainer}>
                                        <p><b className={s.titleInformation}>Instructions</b></p>
                                        <div>{this.props.details.steps ? this.props.details.steps : 'Probably that does not has instructions'}</div>
                                    </div>
                                </div>
                                {/* {this.props.details.createDB && <button className={s.detailsDelete} value={this.props.id} onClick={this.handleDelete}>DELETE</button>} */}
                            </div>
                        )
                            : (
                                <Error message='Details Not Exist For That' />
                            )
                }
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getRecipeById: (id) => {
            dispatch(getRecipeById(id));
        },
        deleteRecipe: (id) => {
            dispatch(deleteRecipe(id));
        }
    }
}

export function mapStateToProps(state) {
    return {
        details: state.recipesDetail,
        loading: state.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailRecipe)
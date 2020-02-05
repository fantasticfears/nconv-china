import React, { useRef, useEffect } from 'react';
import { WithStyles } from "@material-ui/styles/withStyles";
import createStyles from "@material-ui/styles/createStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import { RouteComponentProps } from "@reach/router";
import { useIntl, defineMessages } from "react-intl";
import { useTitle, useEffectOnce, useAsync } from "react-use";
import * as d3 from "d3";
import DisplayBoard from './DisplayBoard';
import { IRegionData } from './models';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Provinces from './Provinces';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { ExtendedFeatureCollection, ExtendedGeometryCollection, ExtendedFeature } from 'd3';

const styles = ({ spacing, transitions }: Theme) => createStyles({
});

interface INationTabVisualizer extends WithStyles<typeof styles> {
  name: string;
  data: IRegionData;
  state: AsyncState<ExtendedFeatureCollection>;
  features: any;
  geoGenerator: d3.GeoPath<any, d3.GeoPermissibleObjects>;
  setProvince: React.Dispatch<React.SetStateAction<string | null>>;
  moveOverRegionPanel: (d: ExtendedFeature) => void;
};


const _NationTabVisualizer: React.FunctionComponent<INationTabVisualizer> = ({ name, data, features, state, geoGenerator, moveOverRegionPanel, setProvince }) => {
  return <Container>
    <Grid container>
      <Grid item md={4} xs={12}>
        <DisplayBoard name={name} data={data} />
      </Grid>
      <Grid item md={8} xs={12}>
        <svg width={1000} height={1000} className="container">
          {state.loading ? "loading" : <Provinces
            moveOverRegionPanel={moveOverRegionPanel}
            geoGenerator={geoGenerator}
            features={features}
            setProvince={setProvince} />}
        </svg>
      </Grid>
    </Grid>
  </Container>
}
const NationTabVisualizer = withStyles(styles)(_NationTabVisualizer);
export default NationTabVisualizer;

package dev.vighnesh153.common

import android.content.res.Configuration
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun ImagesForFirstRelease(imageChangeCounter: Int = 0) {
    val images = when (LocalConfiguration.current.orientation) {
        Configuration.ORIENTATION_PORTRAIT -> ImagesForFirstReleaseDefaults.portraitImages
        Configuration.ORIENTATION_LANDSCAPE -> ImagesForFirstReleaseDefaults.landscapeImages
        else -> null
    }

    if (images == null) {
        BasicText(text = "Unable to detect screen orientation.")
        return
    }

    val image = remember(imageChangeCounter) { images[imageChangeCounter % images.size] }

    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(20.dp),
        horizontalArrangement = Arrangement.spacedBy(20.dp),
    ) {
        item {
            Image(
                painter = painterResource(id = image),
                contentDescription = null,
                modifier = Modifier.fillMaxWidth(),
            )
        }
    }
}

private object ImagesForFirstReleaseDefaults {
    val portraitImages = listOf(
        R.mipmap.portrait_9x16_1,
        R.mipmap.portrait_9x16_2,
        R.mipmap.portrait_9x16_3,
        R.mipmap.portrait_9x16_4,
    )

    val landscapeImages = listOf(
        R.mipmap.landscape_16x9_1,
        R.mipmap.landscape_16x9_2,
        R.mipmap.landscape_16x9_3,
        R.mipmap.landscape_16x9_4,
    )
}
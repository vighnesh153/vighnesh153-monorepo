package dev.vighnesh153.common

import android.content.res.Configuration
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun ImagesForFirstRelease() {
    val context = LocalContext.current

    val images = when (LocalConfiguration.current.orientation) {
        Configuration.ORIENTATION_PORTRAIT -> ImagesForFirstReleaseDefaults.portraitImages
        Configuration.ORIENTATION_LANDSCAPE -> ImagesForFirstReleaseDefaults.landscapeImages
        else -> null
    }

    if (images == null) {
        BasicText(text = "Unable to detect screen orientation.")
        return
    }

    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(20.dp),
        horizontalArrangement = Arrangement.spacedBy(20.dp),
    ) {
        itemsIndexed(images) { index, image ->
            var focused by remember { mutableStateOf(false) }
            Image(
                painter = painterResource(id = image),
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .onFocusChanged { focused = it.isFocused }
                    .border(2.dp, if (focused) Color.Red else Color.Transparent)
                    .clickable {
                        Toast
                            .makeText(
                                context,
                                "You clicked on cat: ${index + 1}",
                                Toast.LENGTH_SHORT
                            )
                            .show()
                    },
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